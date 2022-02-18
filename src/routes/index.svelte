<script lang="ts">
  import Table from "$lib/table/Table.svelte"
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import type { game_times } from "@prisma/client";

  interface PlayerRecord {
    rank: number;
    name: string;
    time: number;
    map: string;
    sid: string;
  };

  let mounted: boolean = false;
  let mapValid: boolean = true;
  let selectedMap: string = $page.url.searchParams.get('map') || "surf_utopia_njv";
  let times: game_times[];
  let records: PlayerRecord[] = [];

  onMount(async () => {
    mounted = true;
    let maps = await fetch('/maps?map=' + selectedMap).then(res => res.json());
    if(maps.length <= 0) 
    {
      mapValid = false;
    } else {
      times = await fetch('/times?map=' + selectedMap).then(res => res.json());
      console.log(times);
      times.forEach((time, i) => {
        records[i] = {
          rank: i + 1,
          name: time.szPlayer,
          time: time.nTime,
          map: time.szMap,
          sid: time.szSID
        };
      });
    }
  });
</script>

{#if mounted}
  {#if mapValid}
    <Table data={records} />
  {:else}
    <div class="grid place-items-center h-screen font-bold text-7xl">No records for the map provided</div>
  {/if}
{/if}