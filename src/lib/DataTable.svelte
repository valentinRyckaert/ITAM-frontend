<script lang="ts">
    import { getAllFromDB } from "../api/data";

    let data: any[] = $state([])
    let props = $props()

    async function getData() {
        data = await getAllFromDB(props.dataName)
    }

</script>

{#await getData()}
        <h1>loading...</h1>
{:then} 
    <table>
        <thead>
        <tr>
            {#each props.dataHeaders as header}
                    <th>{header}</th>
            {/each}
        </tr>
        </thead>
        <tbody> 
            {#each data as element}
                <tr>
                    {#each Object.values(element) as value}
                        <td>{value}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
{/await}


<style lang="scss">
    table {
      width: 100%;
      border-collapse: collapse;
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      tr:hover {
        background-color: #f1f1f1;
      }
    }
</style>