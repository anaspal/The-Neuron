/**
 * Complete, 100% faithful and verbatim educational text
 * As provided in the source document without altering, omitting, or summarizing any sentence.
 */

export interface LessonMetadata {
  lessonTitle: string;
  subject: string;
  chapter: string;
  subTitle: string;
  sectionCode: string;
  grade: string;
  academicYear: string;
  curriculum: string;
  school: string;
  author: string;
  supervisor: string;
  primarySource: string;
  reviewedPages: string;
  sourceDocName: string;
}

export const LESSON_META: LessonMetadata = {
  lessonTitle: "الدرس التعليمي الشامل: العصبون (الخلية العصبية)",
  subject: "العلوم الحياتية",
  chapter: "الفصل الثالث: الجهاز العصبي",
  subTitle: "العصبون (الخلية العصبية)",
  sectionCode: "Neuron | القسم 1.3",
  grade: "الحادي عشر العلمي – شعبة 1",
  academicYear: "2026/2027",
  curriculum: "الفلسطيني – الفصل الأول",
  school: "داخل غزة",
  author: "أنس نهاد محمود الجعل",
  supervisor: "أ. نديم حمدالله جميل بصلات",
  primarySource: "الرزمة التعليمية: العلوم الحياتية للصف الحادي عشر العلمي والزراعي، صفحات الكتاب المطبوعة 24–26، وتحديداً القسم 1.3: العصبون.",
  reviewedPages: "تمت مراجعة الصفحات 24–26",
  sourceDocName: "العلوم الحياتية ١١ جميع المتمازجة غزة.pdf"
};

export interface SectionItem {
  id: string;
  title: string;
  shortTitle: string;
}

export const SECTIONS_NAV: SectionItem[] = [
  { id: "intro", title: "1. مقدمة الدرس", shortTitle: "المقدمة" },
  { id: "objectives", title: "2. الأهداف التعليمية", shortTitle: "الأهداف" },
  { id: "prerequisites", title: "3. المعارف السابقة والتمهيد", shortTitle: "التمهيد" },
  { id: "detailed-explanation", title: "4. الشرح التفصيلي للدرس", shortTitle: "الشرح التفصيلي" },
  { id: "curriculum-drawings", title: "5. الصور والرسومات التعليمية في الرزمة", shortTitle: "الرسومات التعليمية" },
  { id: "applied-examples", title: "6. أمثلة تطبيقية لفهم الدرس", shortTitle: "أمثلة تطبيقية" },
  { id: "common-misconceptions", title: "7. الأخطاء والمفاهيم الشائعة", shortTitle: "المفاهيم الشائعة" },
  { id: "comprehensive-summary", title: "8. الملخص الشامل للدرس", shortTitle: "الملخص" },
  { id: "review-questions", title: "9. أسئلة المراجعة والتدريب", shortTitle: "أسئلة المراجعة" },
  { id: "review-answers", title: "10. نموذج إجابة أسئلة المراجعة", shortTitle: "نموذج الإجابة" },
  { id: "final-exam", title: "11. الاختبار النهائي للدرس", shortTitle: "الاختبار النهائي" },
  { id: "references", title: "12. المراجع والمصادر العلمية", shortTitle: "المراجع" },
  { id: "quality-checklist", title: "13. المراجعة النهائية وضبط الدقة العلمية", shortTitle: "ضبط الدقة" },
];
