#![no_std]

elrond_wasm::imports!();
elrond_wasm::derive_imports!();
use elrond_wasm::types::heap::String;


#[elrond_wasm::derive::contract]
pub trait Vote {
    #[init]
    fn init(&self) {
        self.question().set(String::from(""));
        self.no().set(0);
        self.yes().set(0);
    }
    
    
    
    #[only_owner] 
    #[endpoint]
    fn update_question(&self, newQuestion: String) {
        self.question()
            .set(String::from(newQuestion));
    }

    #[only_owner] 
    #[endpoint]
    fn reset(&self) {
        self.question().set(String::from(""));
        self.no().set(0);
        self.yes().set(0);
        self.voted().clear();
    }

    #[endpoint]
    fn voteYes(&self) {
        let caller = self.blockchain().get_caller();
        let crt_yes = self.yes().get();

        if !self.voted().contains(&caller){
            self.yes().set(crt_yes + 1);
        }
    }

    #[endpoint]
    fn voteNo(&self) {
        let caller = self.blockchain().get_caller();
        let crt_no = self.no().get();

        if !self.voted().contains(&caller){
            self.no().set(crt_no + 1);
        }
    }

    #[view(getQuestion)]
    #[storage_mapper("question")]
    fn question(&self) -> SingleValueMapper<String>;

    #[view(getNrNos)]
    #[storage_mapper("no")]
    fn no(&self) -> SingleValueMapper<u32>;

    #[view(getNrYes)]
    #[storage_mapper("yes")]
    fn yes(&self) -> SingleValueMapper<u32>;

    #[view(votedList)]
    #[storage_mapper("voted")]
    fn voted(&self) -> UnorderedSetMapper<ManagedAddress>;
    
}
