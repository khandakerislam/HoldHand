import { Admin } from "./Admin";
import { address } from "./address";
import { user } from "./user";
import { Institution } from "./Institution";
import { Scholarship } from "./Scholarship";
import { Student } from "./Student";
import { Sponsor } from "./Sponsor";


export class AllData {
    user: user;
	institution: Institution;
	add: address;
	addList: Array<address>;
	scholarship: Scholarship;
	scholarshipList: Array<Scholarship> = [];
	student: Student;
	status: boolean;
	msg: string;
	ids: Array<user> = [];
	file: Blob;
	imageBytes;
}