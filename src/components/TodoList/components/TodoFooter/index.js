import React, { PureComponent } from 'react';
import { AbilityContext } from '../../../Can';
import defineRulesFor from '../../../../config/ability';
const hint = 'Admin - can do anything.\nMember can read everything and manage todos with assignee "me"';
let TodoFooter = (() => {
    class TodoFooter extends PureComponent {
        constructor() {
            super(...arguments);
            this.state = {
                role: 'member'
            };
        }
        get remaining() {
            return this.props.items.filter(item => !item.completed).length;
        }
        _selectedIfRole(role) {
            return this.state.role === role ? 'selected' : '';
        }
        _setRole(role) {
            this.context.update(defineRulesFor(role));
            this.setState({ role });
        }
        render() {
            return (<footer className="footer">
                <span className="todo-count"><b>{this.remaining}</b> left</span>
                <ul className="roles">
                    <li className="help" title={hint}>Switch roles:</li>
                    <li>
                        <button type="button" className={this._selectedIfRole('admin')} onClick={this._setRole.bind(this, 'admin')}>
                            Admin
                        </button>
                    </li>
                    <li>
                        <button type="button" className={this._selectedIfRole('member')} onClick={this._setRole.bind(this, 'member')}>
                            Member
                        </button>
                    </li>
                </ul>
            </footer>);
        }
    }
    TodoFooter.contextType = AbilityContext;
    return TodoFooter;
})();
export default TodoFooter;
;
