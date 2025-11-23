import { Database } from "@/database.types";
import { makeAutoObservable } from "mobx";
type User = Database['public']['Tables']['user']['Row'];

class UserStore {
    id: number | null = null;
    username:string = '';
    email:string = '';
    constructor() {
        makeAutoObservable(this);
    }

    setUserInfo(user: User) {
        console.log('set user info', this.id, this.email, this.username);
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
    }

    clear() {
        console.log('clear user info', this.id, this.email, this.username);
        this.id = null;
        this.email = '';
        this.username = '';
    }   
}

export const userStore = new UserStore();