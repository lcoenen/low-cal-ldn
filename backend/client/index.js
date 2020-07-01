const { JSONRPCClient, createJSONRPCErrorResponse } = require("json-rpc-2.0");
const fetch = require("node-fetch");

class Client {
    constructor(url, instanceID, zome) {
        this.instanceID = instanceID;
        this.zome = zome;

        // JSONRPCClient needs to know how to send a JSON-RPC request.
        // Tell it by passing a function to its constructor. The function must take a JSON-RPC request and send it.
        this.jsonrpcClient = new JSONRPCClient((jsonRPCRequest) =>
            fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(jsonRPCRequest)
            }).then(response => {
                if (response.status === 200) {
                    // Use jsonrpcClient.receive when you received a JSON-RPC response.
                    return response.json().then(jsonRPCResponse => this.jsonrpcClient.receive(jsonRPCResponse));
                } else if (jsonRPCRequest.id !== undefined) {
                    return Promise.reject(new Error(response.statusText));
                }
            })
        );
    }

    async call(fn, args) {
        const req = await this.jsonrpcClient.request("call", {
            "instance_id": this.instanceID, "zome": this.zome, "function": fn, "args": args || {}
        });
        const jsonResp = JSON.parse(req);

        if (jsonResp.Ok === undefined) {
            throw jsonResp.Err;
        }

        return jsonResp.Ok;
    };
}

const URL = "http://localhost:8888/";
const INSTANCE = "test-instance";
const ZOME = "main";

const client = new Client(URL, INSTANCE, ZOME)

let artifact = {
    kind: "Item",
    coord: [231.3211, 112.1124],
    metadata: { hello: 0, foo: "bar" },
}

client.call("create_artifact", { artifact: artifact })
    .catch(e => console.log(e))
    .then(r => {
        console.log('client.call("create_artifact", { artifact: artifact })', r)
        client.call("get_artifact_by_adr", { address: r })
            .catch(e => console.log(e))
            .then(r => {
                console.log('client.call("get_artifact_by_adr", { address: r })', r)
            });
    });

let art2 = artifact
art2.kind = "Test"
art2.coord = [20, 10]

client.call("create_artifact", { artifact: art2 })
    .catch(e => console.log(e))
    .then(r => {
        console.log('client.call("create_artifact", { artifact: art2 })', r)
        client.call("get_artifact_by_adr", { address: r })
            .catch(e => console.log(e))
            .then(r => {
                console.log('client.call("get_artifact_by_adr", { address: r })', r)
            });
        client.call("remove_artifact_by_adr", { address: r })
            .catch(e => console.log(e))
            .then(r => {
                console.log('client.call("remove_artifact_by_adr", { address: r })', r)
            });
        client.call("get_artifact_by_adr", { address: r })
            .catch(e => console.log(e))
            .then(r => {
                console.log('client.call("get_artifact_by_adr", { address: r })', r)
            });
    });

client.call("create_artifact", { artifact: art2 })
    .catch(e => console.log(e))
    .then(r => {
        console.log('client.call("create_artifact", { artifact: art2 })', r)
        client.call("get_artifact_by_adr", { address: r })
            .catch(e => console.log(e))
            .then(r => {
                console.log('client.call("get_artifact_by_adr", { address: r })', r)
            });
    });

client.call("get_all_artifacts")
    .catch(e => console.log(e))
    .then(r => {
        console.log('client.call("get_all_artifacts")', r)
    });

client.call("get_artifacts_around", { coord: [20, 10], radius: 50 })
    .catch(e => console.log(e))
    .then(r => {
        console.log('client.call("get_artifacts_around", { coord: [20, 10], radius: 50 })', r)
    });

client.call("get_artifacts_around", { coord: [20, 10], radius: -50 })
    .catch(e => console.log(e))
    .then(r => {
        console.log('client.call("get_artifacts_around", { coord: [20, 10], radius: -50 })', r)
    });

client.call("get_artifacts_around", { coord: [20, 10], radius: 235 })
    .catch(e => console.log(e))
    .then(r => {
        console.log('client.call("get_artifacts_around", { coord: [20, 10], radius: 235 })', r)
    });

client.call("get_artifacts_by_kind", { kind: "Test" })
    .catch(e => console.log(e))
    .then(r => {
        console.log('client.call("get_artifacts_by_kind", { kind: "Test" })', r)
    });
