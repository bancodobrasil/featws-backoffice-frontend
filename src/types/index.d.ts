export const enum RuleStatusEnum {
  DEFERRED = 'deferred',
  AWAITING = 'awaiting',
  DRAFT = 'draft',
}

export type TRuleStatus = `${RuleStatusEnum}`;
