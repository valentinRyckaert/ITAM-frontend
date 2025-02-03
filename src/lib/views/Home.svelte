<script lang="ts">
    import { onMount } from 'svelte'
    import { getAllFromDB } from '../../api/data'

    let devices: { [key: string]: number } = {}

    onMount(async () => {
        const data = await getAllFromDB("devices")
        data.forEach(element => {
            const os = element.DEV_os
            if (os in devices) devices[os]++
            else devices[os] = 1
        })
    })

</script>

<h2>Welcome</h2>
<div class="card-container">
    {#each Object.entries(devices) as [key, value]}
        <div class="card">
            <div class="label">{key}</div>
            <div class="number">{value}</div>
        </div>
    {/each}
</div>

<style lang="scss">
    h2 {
        text-align: center;
        color: #333;
        margin-bottom: 30px;
    }

    .card-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 20px;
    }

    .card {
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: center;
        width: 200px;
        margin: 20px auto;

        .label {
            font-size: 16px;
            color: #555;
            margin-bottom: 10px;
        }

        .number {
            font-size: 48px;
            font-weight: bold;
            color: #2c3e50;
        }
    }
</style>