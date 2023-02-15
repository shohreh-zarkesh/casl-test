import { AbilityBuilder, Ability } from '@casl/ability';

export const AppAbility = Ability;
export default function defineRulesFor(role) {

    const { can, rules } = new AbilityBuilder(AppAbility);

    if (role === 'admin') {
        can('manage', 'all');
    }
    else {
        can(['read', 'create'], 'Todo');
        can(['update', 'delete'], 'Todo', { assignee: 'me' });
    }
    return rules;
}
export function buildAbilityFor(role) {
    return new AppAbility(defineRulesFor(role), {
        detectSubjectType: (object) => object.type
    });
}
