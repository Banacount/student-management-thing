
export class Student {
	constructor (fullname) {
		this.id = Date.now().toString();
		this.fullname = fullname;
		this.grades = [];
		this.average = 0.0;
	}
}
