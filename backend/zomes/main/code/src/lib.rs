#![feature(proc_macro_hygiene)]

use hdk::prelude::*;
use hdk_proc_macros::zome;

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Artifact {
    kind: String,
    coord: [f64; 2],
    metadata: serde_json::Value,
}

#[zome]
mod my_zome {
    #[init]
    fn init() {
        Ok(())
    }

    #[validate_agent]
    pub fn validate_agent(validation_data: EntryValidationData<AgentId>) {
        Ok(())
    }

    #[entry_def]
    fn artifact_def() -> ValidatingEntryType {
        entry!(
            name: "artifact",
            description: "artifact definition",
            sharing: Sharing::Public,
            validation_package: || {
                hdk::ValidationPackageDefinition::Entry
            },
            validation: | _validation_data: hdk::EntryValidationData<Artifact>| {
                Ok(())
            }
        )
    }

    #[zome_fn("hc_public")]
    fn create_artifact(artifact: Artifact) -> ZomeApiResult<Address> {
        let artifact = Entry::App("artifact".into(), artifact.into());
        let address = hdk::commit_entry(&artifact)?;
        Ok(address)
    }

    #[zome_fn("hc_public")]
    fn get_artifact_by_adr(address: Address) -> ZomeApiResult<Artifact> {
        hdk::utils::get_as_type(address)
    }

    fn query_all() -> ZomeApiResult<Vec<Artifact>> {
        hdk::query("artifact".into(), 0, 0).map(|y| {
            y.iter()
                .map(|x| hdk::utils::get_as_type(x.clone()).unwrap())
                .collect()
        })
    }

    #[zome_fn("hc_public")]
    fn get_all_artifacts() -> ZomeApiResult<Vec<Artifact>> {
        query_all()
    }
}
