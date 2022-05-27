import { publicAPI } from '../axios';
import { IRule, IRuleSheet } from '../../interfaces';
import { createFakeRuleSheet } from '../../utils/factory/FakeRuleSheet';
import wrapPromise, { WrapPromise } from '../../utils/suspense/WrapPromise';
import { RuleStatusEnum } from '../../types';

type GetAllRuleSheetsResponse = Pick<IRuleSheet, 'id' | 'name'>[];

const getAllRuleSheets = (): WrapPromise<IRuleSheet[]> => {
  const promise = publicAPI.get<GetAllRuleSheetsResponse>('/v1/rulesheets').then(response => {
    const records: IRuleSheet[] = response.data.map(record => {
      const fakeData = createFakeRuleSheet();
      return { ...fakeData, ...record };
    });
    return records;
  });
  return wrapPromise(promise);
};

type GetRuleSheetResponse = IRuleSheet;

const getRuleSheet = (id: string): WrapPromise<IRuleSheet> => {
  // TODO: Implement the API request
  // The Promise below simulates the loading time of the request, remove it when you implement the request itself.
  const promise = new Promise<GetRuleSheetResponse>((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error('Failed to fetch RuleSheet'));
      resolve({
        id: Number(id),
        name: 'Internet APF',
        slug: 'internet-apf',
        description:
          'É uma plataforma de onboarding para não correntistas e correntistas PF/PJ e GOV. \nO objetivo é que cada cliente acesse uma página que reflita, de maneira personalizada, os seus interesses e serviços do Banco do Brasil',
        code: '12345678',
        rules: [
          {
            id: '1',
            title: 'Alteração no Bundle',
            date: new Date(2021, 11, 20, 10, 55, 30, 500),
            author: 'C1313233 Rhuan Queiroz',
            status: RuleStatusEnum.DEFERRED,
          },
          {
            id: '2',
            title: 'Alteração no Bundle',
            date: new Date(2022, 2, 5, 10, 55, 30, 500),
            author: 'C1313233 Rhuan Queiroz',
            status: RuleStatusEnum.AWAITING,
          },
          {
            id: '3',
            title: 'Alteração no Bundle',
            date: new Date(2022, 1, 2, 10, 55, 30, 500),
            author: 'C1313233 Rhuan Queiroz',
            status: RuleStatusEnum.DRAFT,
          },
          {
            id: '4',
            title: 'Alteração no Bundle',
            date: new Date(2022, 1, 2, 10, 55, 30, 500),
            author: 'C1313233 Rhuan Queiroz',
            status: RuleStatusEnum.DEFERRED,
          },
          {
            id: '5',
            title: 'Alteração no Bundle',
            date: new Date(2022, 1, 2, 10, 55, 30, 500),
            author: 'C1313233 Rhuan Queiroz',
            status: RuleStatusEnum.DEFERRED,
          },
          {
            id: '6',
            title: 'Alteração no Bundle',
            date: new Date(2022, 1, 2, 10, 55, 30, 500),
            author: 'C1313233 Rhuan Queiroz',
            status: RuleStatusEnum.DEFERRED,
          },
          {
            id: '7',
            title: 'Alteração no Bundle',
            date: new Date(2022, 1, 2, 10, 55, 30, 500),
            author: 'C1313233 Rhuan Queiroz',
            status: RuleStatusEnum.DEFERRED,
          },
          {
            id: '8',
            title: 'Alteração no Bundle',
            date: new Date(2022, 1, 2, 10, 55, 30, 500),
            author: 'C1313233 Rhuan Queiroz',
            status: RuleStatusEnum.DEFERRED,
          },
          {
            id: '9',
            title: 'Alteração no Bundle',
            date: new Date(2022, 1, 2, 10, 55, 30, 500),
            author: 'C1313233 Rhuan Queiroz',
            status: RuleStatusEnum.DEFERRED,
          },
        ],
      });
    }, 2000);
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

const deferRules = (rules: IRule[]): Promise<void> =>
  // TODO: Implement API request for defer rules
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error('Error deferring Rule'));
      resolve();
    }, 2000);
  });

export { getAllRuleSheets, getRuleSheet, createRuleSheet, deferRules };
