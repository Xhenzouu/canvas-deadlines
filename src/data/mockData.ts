export type Category = "Assignments" | "Labs" | "Knowledge Checks";

export interface Assignment {
  id: string;
  course: string;
  title: string;
  category: Category;
  due: string;
}

const COURSE = "AWS re/Start Cohort 2026";

export const initialAssignments: Assignment[] = [
  { id: "a1", course: COURSE, title: "AWS re/Start Interview Preparation", category: "Assignments", due: "2026-10-20" },
  { id: "a2", course: COURSE, title: "Finalize Portfolio", category: "Assignments", due: "2026-10-22" },
  { id: "a3", course: COURSE, title: "Resume Review Submission", category: "Assignments", due: "2026-10-24" },
  { id: "a4", course: COURSE, title: "Capstone Project Proposal", category: "Assignments", due: "2026-10-28" },
  { id: "l1", course: COURSE, title: "316-[AI]-Lab- Amazon SageMaker - Training a machine-learning model", category: "Labs", due: "2026-10-19" },
  { id: "l2", course: COURSE, title: "Activity - Creating Tables and Data Types", category: "Labs", due: "2026-10-21" },
  { id: "l3", course: COURSE, title: "Lab - Configuring an Amazon VPC", category: "Labs", due: "2026-10-23" },
  { id: "l4", course: COURSE, title: "Lab - Linux Command Line Basics", category: "Labs", due: "2026-10-25" },
  { id: "k1", course: COURSE, title: "KC - Amazon Virtual Private Cloud [VPC]", category: "Knowledge Checks", due: "2026-10-18" },
  { id: "k2", course: COURSE, title: "KC - Analysis", category: "Knowledge Checks", due: "2026-10-20" },
  { id: "k3", course: COURSE, title: "KC - AWS Identity and Access Management", category: "Knowledge Checks", due: "2026-10-22" },
  { id: "k4", course: COURSE, title: "KC - Databases on AWS", category: "Knowledge Checks", due: "2026-10-26" },
];

export const auditRow = {
  course_count: 1,
  total_assignments_scanned: 180,
  unsubmitted_count: 137,
  last_synced: "2026-10-17 06:21",
};

const syncPool = [
  "Mock Interview Reflection",
  "Cloud Architecture Diagram",
  "Peer Review - Portfolio",
  "Weekly Progress Journal",
];

export function makeSyncedAssignment(n: number): Assignment {
  return {
    id: `s${Date.now()}`,
    course: COURSE,
    title: syncPool[n % syncPool.length] ?? "New Assignment",
    category: "Assignments",
    due: "2026-10-30",
  };
}
