export const enum RuleStatusEnum {
  DRAFT = 'draft',
  AWAITING_DEFERRAL = 'awaiting_deferral',
  DEFERRED = 'deferred',
  AWAITING_CANCELLATION = 'awaiting_cancellation',
  CANCELED = 'canceled',
}

export type TRuleStatus = `${RuleStatusEnum}`;
