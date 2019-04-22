import { StudentCategoryType } from './enums/student-category-type.enum';

export interface Student {
    id: number;
    name: string;
    fatherName: string;
    motherName: string;
    documents: { name: string, isPresent: boolean }[];
    dob: Date;
    studentCategoryType: StudentCategoryType;
    lastClassScore: number;
}
