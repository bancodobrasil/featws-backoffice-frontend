import { publicAPI } from '../axios';
import { IRuleSheet } from '../../interfaces';
import { createFakeRuleSheet } from '../../utils/factory/FakeRuleSheet';

type GetAllRulesheetsResponse = Pick<IRuleSheet, 'id' | 'name'>[];

const getAllRuleSheets = async () => {
  const response = await publicAPI.get<GetAllRulesheetsResponse>('/v1/rulesheets');
  const records: IRuleSheet[] = response.data.map(record => {
    const fakeData = createFakeRuleSheet();
    return { ...fakeData, ...record };
  });
  return records;
};

export { getAllRuleSheets };
