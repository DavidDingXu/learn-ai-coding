## ADDED Requirements

### Requirement: Generate today's executable plan

The system SHALL generate a today plan from a list of tasks, a target date, and a daily capacity in minutes.

#### Scenario: Include overdue and due-today open tasks

- **WHEN** the input contains open tasks due before the target date, open tasks due on the target date, and open tasks due after the target date
- **THEN** the today plan MUST include only overdue and due-today open tasks
- **AND** overdue tasks MUST appear before due-today tasks

#### Scenario: Exclude non-actionable tasks

- **WHEN** the input contains completed tasks, blocked tasks, and open tasks due before or on the target date
- **THEN** the today plan MUST exclude completed and blocked tasks
- **AND** the today plan MUST keep open overdue or due-today tasks eligible for selection

### Requirement: Respect daily capacity

The system SHALL keep the selected today plan within the provided daily capacity.

#### Scenario: Defer tasks that cannot fit

- **WHEN** eligible tasks exceed the provided capacity
- **THEN** the today plan MUST include only tasks whose total estimated minutes fit within capacity
- **AND** eligible tasks that cannot fit MUST be returned in a deferred list
- **AND** the output MUST include used minutes and remaining minutes

### Requirement: Prioritize overdue work predictably

The system SHALL sort overdue work by business urgency before task age.

#### Scenario: Priority wins before due date age

- **WHEN** multiple overdue tasks have different priorities and due dates
- **THEN** higher-priority overdue tasks MUST appear before lower-priority overdue tasks
- **AND** due date age MUST only break ties after priority
