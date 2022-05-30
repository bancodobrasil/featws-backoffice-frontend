export const enum RuleStatusEnum {
  DEFERRED = 'deferred',
  AWAITING_DEFERRAL = 'awaiting_deferral',
  DRAFT = 'draft',
}

export type TRuleStatus = `${RuleStatusEnum}`;
