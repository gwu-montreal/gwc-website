---
name: index
layout: default
---

::: <!--+ #description .text-block -->
## Français

The Game Workers Coalition is a communication network for worker-led labour organizations and unions in the games industry.

Since 2017 we have seen an enormous upswell in organizing in the games industry, from a growth of interest in and support for unionization to walkouts, strikes, and the foundation of new unions all around the world, in studios of all sizes. As the games industry increasingly operates an an international scale through mergers and acquisitons of AAA studios and the migration to remote work in response to COVID, the purpose of the GWC is to coordinate between local games labour organizations to facilitate cooperation in our efforts to improve working conditions and build power in our industry.

The Game Workers Coalition was formed by several international labour organizations, as a decentralized network in the spirit of international solidarity. The GWC does not have its own executive capacity, but is rather composed of delegates from each of our member organizations.
:::

::: <!--+ #orgs-list -->
## Member organizations:

{% for regionname, region in orgs -%}
  {% if region.length %}
  - ### {{ regionname | i18n }} <!--+ .region-name -->
    {% for org in region %}
    - [{{ org.name }}]({{ org.link }}){% if org.location %} <span>({{ org.location }})</span>{% endif %}
    {%- endfor %}
  {%- endif %}
{%- endfor %}
:::

::: <!--+ #bottom-text .text-block -->
If you represent an organization that is interested in joining the network, please reach out to any of the orgs in this list to ask about becoming a GWC member. Members of the GWC have to abide by [our statutes](/statutes).
:::
