import { date } from 'faker';
import { ExpressMiddlewareInterface } from 'routing-controllers/types';
import { Service } from 'typedi/types';

@Service()
export class AgeCheck implements ExpressMiddlewareInterface {
  use(request: any, response: any, next?: (err?: any) => any): Promise<any> {
    if(request.body.date_of_birth) {
        const date_of_birth = new Date(request.body.date_of_birth);
        let age_check = new Date();
        age_check.setFullYear(age_check.getFullYear() - 18);
        if((date_of_birth).getTime() > age_check.getTime()) {
            return response.status(400).send({status: 400, message: 'You must be 18 years old or above to access this route.'});
        } else {
            next();
        }
    } else {
        return response.status(400).send({status: 400, message: 'Date of birth is missing, please provide us with your birth date.'});

    }
  }
}
