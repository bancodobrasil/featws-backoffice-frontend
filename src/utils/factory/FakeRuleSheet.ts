import faker from '@faker-js/faker/locale/pt_BR';
import { IRuleSheet } from '../../interfaces';

type CreateFakeRuleSheetParams = Partial<IRuleSheet>;

const createFakeRuleSheet = (params?: CreateFakeRuleSheetParams): IRuleSheet => {
  const fields = params || {};
  if (!fields.id) {
    fields.id = Math.floor(Math.random() * 10000) + 1;
  }
  if (!fields.slug) {
    fields.slug = `${faker.word.adjective()}-${faker.word.verb()}`;
  }
  if (!fields.name) {
    fields.name = fields.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  if (!fields.description) {
    fields.description = faker.lorem.paragraph();
  }
  if (!fields.code) {
    fields.code = faker.datatype.uuid();
  }
  if (!fields.responsible) {
    fields.responsible = faker.name.findName();
  }
  if (!fields.updatedAt) {
    fields.updatedAt = faker.date.past(1);
  }
  return fields as IRuleSheet;
};

export { createFakeRuleSheet };
