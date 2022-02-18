<script context="module" lang="ts">
  interface PlayerRecord {
    rank: number;
    name: string;
    time: number;
    map: string;
    sid: string;
  }
</script>

<script lang="ts">
  import type { game_times } from '@prisma/client';

  import { Datatable } from 'svelte-simple-datatables';
  import Icon from 'svelte-awesome';
  import { steam } from 'svelte-awesome/icons';
  import prettyMilliseconds from 'pretty-ms';

  export let data: PlayerRecord[];

  const settings = {
    sortable: true,
    pagination: true,
    rowsPerPage: 50,
    columnFilter: false,
    css: true
  };
  let rows;
</script>

<div class="h-screen p-2">
  <Datatable {settings} {data} bind:dataRows={rows}>
    <thead>
      <th data-key="rank">Rank</th>
      <th data-key="name">Username</th>
      <th data-key="time">Time</th>
      <th data-key="map">Map</th>
    </thead>
    <tbody>
      {#if rows}
        {#each $rows as row}
          <tr>
            <td>{row.rank}</td>
            <td><a href={'https://steamcommunity.com/profiles/' + row.sid}>{row.name} <Icon data={steam} scale={0.8} /></a></td>
            <td>{prettyMilliseconds(row.time * 1000, { colonNotation: true })}</td>
            <td>{row.map}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </Datatable>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  @layer base {
    th {
      @apply border-neutral-600 bg-neutral-800 text-white text-left pl-0 min-w-[500px] !important;
    }
    td {
      @apply border-neutral-600 border-b !important;
    }

    :global(.datatable) {
      @apply bg-neutral-800 text-white relative !important;
    }

    :global(.dt-table) {
      @apply overflow-hidden !important;
    }

    :global(.dt-pagination) {
      @apply bg-neutral-800 text-white !important;
    }

    :global(.active) {
      @apply bg-slate-700 text-white !important;
    }
  }
</style>
