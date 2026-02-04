<script lang="ts">
</script>

<svelte:head>
  <title>40k Score Sheet</title>
</svelte:head>

<div class="font-1 mx-auto flex w-full max-w-3xl flex-col gap-1 bg-white px-10 py-5 text-black">
  <h1 class="text-center text-3xl font-bold">40K Score Sheet</h1>
  <table class="table-score w-full table-fixed">
    <colgroup>
      <col style="width: 18%" />
      <col style="width: auto;" />
      <col style="width: 10%;" />
      <col style="width: auto;" />
      <col style="width: 10%;" />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-lg">Players:</td>
        <td colspan="2"></td>
        <td colspan="2"></td>
      </tr>
      {#each [1, 2, 3, 4, 5] as turn}
        <tr>
          <th colspan="5" class="bg-cyan-700 py-0 font-bold text-white">Turn {turn}</th>
        </tr>
        <tr>
          <td>PVP</td>
          <td></td>
          <td class=""></td>
          <td></td>
          <td class=""></td>
        </tr>
        <tr>
          <td>SVP</td>
          <td></td>
          <td class=""></td>
          <td></td>
          <td class=""></td>
        </tr>
        <tr>
          <td>SVP</td>
          <td></td>
          <td class=""></td>
          <td></td>
          <td class=""></td>
        </tr>
      {/each}
      <tr>
        <td style="border: none;"></td>
      </tr>
      <tr class="border-3 bg-neutral-300">
        <td>Total</td>
        <td></td>
        <td class=""></td>
        <td></td>
        <td class=""></td>
      </tr>
    </tbody>
  </table>

  <table class="table-cp table-fixed border-2">
    <colgroup>
      <col style="width: 18%" />
      <col style="width: auto;" />
      <col style="width: 10%;" />
      <col style="width: auto;" />
      <col style="width: 10%;" />
    </colgroup>
    <tbody>
      <tr class="font-bold border-b-2 text-center">
        <td class="text-center">CP</td>
        <td style="border-left: solid black 2px;">1</td>
        <td>2</td>
        <td>Bonus</td>
        <td style="border-left: solid black 2px;">1</td>
        <td>2</td>
        <td>Bonus</td>
      </tr>
      {#each [1, 2, 3, 4, 5] as turn}
        <tr>
          <td class="text-center">{turn}</td>
          <td style="border-left: solid black 2px;"></td>
          <td></td>
          <td></td>
          <td style="border-left: solid black 2px;"></td>
          <td></td>
          <td></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  @media print {
    div {
      -webkit-print-color-adjust: exact; /* Chrome, Safari, Edge */
      print-color-adjust: exact; /* Firefox */
    }
  }

  @page {
    size: auto;
    margin: 0mm;
  }

  .table-score {
    td {
      border-width: 2px;
      border-style: solid;
      border-color: black;
      padding: 0.1rem 1rem;
      text-align: center;
    }
    th {
      border-width: 2px;
      border-style: solid;
      border-color: black;
      padding: 0rem 1rem;
      text-align: left;
    }
  }

  .table-cp td {
    border-width: 1px;
    border-style: solid;
    border-color: black;
    padding: 0.2rem 1rem;
  }
</style>
