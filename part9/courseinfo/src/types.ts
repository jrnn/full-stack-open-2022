interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string
}

interface CoursePartNormal extends CoursePartWithDescription {
  type: "normal"
}

interface CoursePartGroupProject extends CoursePartBase {
  type: "groupProject"
  groupProjectCount: number
}

interface CoursePartSubmission extends CoursePartWithDescription {
  type: "submission"
  exerciseSubmissionLink: string
}

interface CoursePartSpecial extends CoursePartWithDescription {
  type: "special"
  requirements: Array<string>
}

export type CoursePart = CoursePartNormal
  | CoursePartGroupProject
  | CoursePartSubmission
  | CoursePartSpecial;
