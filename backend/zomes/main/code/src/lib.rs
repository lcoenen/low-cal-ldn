#![feature(proc_macro_hygiene)]

use hdk::prelude::*;
use hdk_proc_macros::zome;

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Artifact {
    kind: String,
    coord: [f64; 2],
    metadata: serde_json::Value,
}

fn dist(a0: f64, a1: f64, b0: f64, b1: f64) -> f64 {
    ((a0 - b0).powi(2) + (a1 - b1).powi(2)).sqrt()
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

    #[zome_fn("hc_public")]
    fn get_artifacts_around(coord: Vec<f64>, radius: f64) -> ZomeApiResult<Vec<Artifact>> {
        if coord.len() != 2 {
            return Err(ZomeApiError::Internal("Coord must have 2 floats".into()));
        }
        if radius <= 0.0 {
            return Err(ZomeApiError::Internal("Radius must be positive".into()));
        }

        query_all().map(|x| {
            x.iter()
                .cloned()
                .filter(|y| dist(coord[0], coord[1], y.coord[0], y.coord[1]).abs() <= radius)
                .collect()
        })
    }

    #[zome_fn("hc_public")]
    fn get_artifacts_by_kind(kind: String) -> ZomeApiResult<Vec<Artifact>> {
        query_all().map(|x| {
            x.iter()
                .cloned()
                .filter(|y| y.kind == kind)
                .collect()
        })
    }
}
