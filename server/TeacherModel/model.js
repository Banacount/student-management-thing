
export class Teacher {
	constructor (fullname, username, password_hash) {
		this.id = Date.now().toString();
		this.username = username;
		this.password = password_hash; 
		this.students = [];
		this.teacher_fullname = fullname;
	}
}

