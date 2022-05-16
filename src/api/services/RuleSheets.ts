import axios from 'axios';
import { publicAPI } from '../axios';
import { IRuleSheet } from '../../interfaces';
import { createFakeRuleSheet } from '../../utils/factory/FakeRuleSheet';
import { APIError, UnhandledError } from '../errors';
import { WithRequired } from '../../types';

type GetAllRuleSheetsResponse = Pick<IRuleSheet, 'id' | 'name'>[];

const getAllRuleSheets = async (): Promise<IRuleSheet[]> => {
  try {
    const response = await publicAPI.get<GetAllRuleSheetsResponse>('/v1/rulesheets');
    const records: IRuleSheet[] = response.data.map(record => {
      const fakeData = createFakeRuleSheet();
      return { ...fakeData, ...record };
    });
    return records;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // TODO: check response status code, inspect the response data, and throw the correct error type
      if (error.response?.status) {
        throw new APIError(error.response.status);
      }
    }
    console.error(error);
    throw new UnhandledError(error);
  }
};

type CreateRuleSheetParams = WithRequired<IRuleSheet, 'name' | 'slug'>;
type CreateRuleSheetResponse = Pick<IRuleSheet, 'id' | 'name'>;

const createRuleSheet = async (data: CreateRuleSheetParams): Promise<IRuleSheet> => {
  try {
    const response = await publicAPI.post<CreateRuleSheetResponse>('/v1/rulesheets', data);
    const fakeData = createFakeRuleSheet();
    return { ...fakeData, ...response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // TODO: check response status code, inspect the response data, and throw the correct error type
      if (error.response?.status) {
        throw new APIError(error.response.status);
      }
    }
    console.error(error);
    throw new UnhandledError(error);
  }
};

export { getAllRuleSheets, createRuleSheet };
