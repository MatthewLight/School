export enum Subject {
  math = 'Math',
  english = 'English',
  biology = 'Biology'
}

export enum Lessons {
  math = 'Math',
  english = 'English',
  biology = 'Biology'
}

const d: Date = new Date();

export interface Teacher {
  firstName: string,
  lastName: string,
  fathersName: string,
  age: number,
  sex: string,
  address: string,
  experience: number,
  subjects: Subject
}

export interface Lesson {
  firstName: string,
  lastName: string,
  fathersName: string,
  lesson: Lessons,
  day: string,
  teacher: string,
  time: Date,
}

export interface Classroom {
  classroom: number,
  firstName: string,
  lastName: string,
  fathersName: string,
}
