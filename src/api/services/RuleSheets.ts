import { publicAPI } from '../axios';
import { IRuleSheet } from '../../interfaces';
import { createFakeRuleSheet } from '../../utils/factory/FakeRuleSheet';
import wrapPromise from '../../utils/suspense/WrapPromise';

type GetAllRuleSheetsResponse = Pick<IRuleSheet, 'id' | 'name'>[];

const getAllRuleSheets = (): { read: () => IRuleSheet[] } => {
  const promise = publicAPI.get<GetAllRuleSheetsResponse>('/v1/rulesheets').then(response => {
    const records: IRuleSheet[] = response.data.map(record => {
      const fakeData = createFakeRuleSheet();
      return { ...fakeData, ...record };
    });
    return records;
  });
  return wrapPromise(promise);
};
type CreateRuleSheetParams = Required<Pick<IRuleSheet, 'name' | 'slug'>>;
type CreateRuleSheetResponse = Pick<IRuleSheet, 'id' | 'name'>;

const createRuleSheet = async (data: CreateRuleSheetParams): Promise<IRuleSheet> => {
  const response = await publicAPI.post<CreateRuleSheetResponse>('/v1/rulesheets', data);
  const fakeData = createFakeRuleSheet();
  return { ...fakeData, ...response.data };
};

export { getAllRuleSheets, createRuleSheet };
