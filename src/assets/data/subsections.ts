import { Subsection } from "../../@types";

export const subsections: Subsection = {
  stack: {
    title: "Stack",
  },
  skills: {
    title: "Skills",
    itemsBlockLeft: [
      { legend: "React", value: 5 },
      { legend: "Material-UI", value: 5 },
      { legend: "TypeScript", value: 5 },
      { legend: "Product Management", value: 4 },
      { legend: "Scrum", value: 4 },
      { legend: "HTML(5)", value: 4 },
      { legend: "CSS(3)", value: 4 },
    ],
    itemsBlockRight: [
      { legend: "React Native", value: 4 },
      { legend: "Python", value: 4 },
      { legend: "Django REST Framework", value: 4 },
      { legend: "MySQL", value: 3 },
      { legend: "R", value: 2 },
      { legend: "Arduino", value: 2 },
      { legend: "Sci-kit Learn", value: 1 },
    ]
  },
  languages: {
    title: "Languages",
    itemsBlockLeft: [
      { legend: "English", value: 5 },
    ],
    itemsBlockRight: [
      { legend: "Mandarin", value: 4 },
    ]
  },
  tools: {
    title: "Tools",
    itemsBlockLeft: [
      { legend: "AWS S3", value: 5 },
      { legend: "AWS Cloudfront", value: 4 },
      { legend: "Git", value: 4 },
    ],
    itemsBlockRight: [
      { legend: "Docker", value: 3 },
      { legend: "AWS EC2", value: 3 },
      { legend: "AWS Lambda", value: 2 },
    ]
  },
}