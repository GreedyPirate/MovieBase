import { User } from "@supabase/supabase-js";
import { makeAutoObservable } from "mobx";

class UserStore {
    user: User | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    setUserInfo(user: User) {
        this.user = user;
    }

    clear() {
        this.user = null
    }   
}

export const userStore = new UserStore();