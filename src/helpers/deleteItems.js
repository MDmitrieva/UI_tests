const { Client } = require('pg')

const client = new Client({
  user: 'planner-service',
  host: 'api.planner-01-dev.infotech.team',
  database: 'planner-service',
  password: 'planner-service',
  port: 5432,
})
client.connect()
client.query(
  `do
$$
    declare
        uuids uuid[] = '{b83c006c-fb39-4e56-8cf0-531066f8622e}'::uuid[];

    begin
        delete
        from planner_service.event_resource
        where event_id in (select id
                           from planner_service.events
                           where created_by = any (uuids));

        delete
        from planner_service.resource_event_type
        where event_type_id in (select id
                                from planner_service.event_type
                                where created_by = any (uuids));

        delete
        from planner_service.plan_event_type
        where plan_id in (select id
                          from planner_service.plans
                          where created_by = any (uuids));
        delete
        from planner_service.plan_report_template
        where plan_id in (select id
                          from planner_service.plans
                          where created_by = any (uuids));
        delete
        from planner_service.plan_type_event_type
        where plan_type_id in (select id
                               from planner_service.plan_type
                               where created_by = any (uuids));
        delete
        from planner_service.plan_type_report_templates
        where plan_type_id in (select id
                               from planner_service.plan_type
                               where created_by = any (uuids));
        delete
        from planner_service.plan_resource
        where plan_id in (select id
                          from planner_service.plans
                          where created_by = any (uuids));
        delete
        from planner_service.resource_field_value
        where resource_id in (select id
                              from planner_service.resources
                              where created_by = any (uuids));
        delete
        from planner_service.resource_type_field
        where resource_type_id in (select id
                                   from planner_service.resource_type
                                   where created_by = any (uuids));

        delete
        from planner_service.events
        where created_by = any (uuids);
        delete
        from planner_service.event_type
        where created_by = any (uuids);

        delete
        from planner_service.tag_plans
        where plan_id in (select id
                          from planner_service.plans
                          where created_by = any (uuids));

        delete
        from planner_service.plan_constraints
        where created_by = any (uuids);
        delete
        from planner_service.plans
        where created_by = any (uuids);

        delete
        from planner_service.plan_type_constraints
        where created_by = any (uuids);
        delete
        from planner_service.plan_type
        where created_by = any (uuids);

        delete
        from planner_service.resources
        where created_by = any (uuids);
        delete
        from planner_service.resource_type
        where created_by = any (uuids);
    END;
    $$ LANGUAGE plpgsql;`,

  (err, res) => {
    // eslint-disable-next-line no-console
    console.log(err, res)
    client.end()
  },
)
