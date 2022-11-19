
import routes from "../../../routes";

export function getRelatedRoute(sectionType) {
    switch (sectionType) {
        case 'applicationform':
            return routes.applicationForm
    
        case 'exam':
            return routes.examinations
    
        case 'medical':
            return routes.medicals
    
        case 'interview':
            return routes.interviewApplicant
    
        default:
            return '';
    }
}