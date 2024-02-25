<script lang="ts">
    import { EcPositional } from "$lib/GameSystem/Component/EcPositional";
	import { EnManager } from "$lib/GameSystem/EnManager";
	import { GsManager } from "$lib/GameSystem/GsManager";
	import { GsWorldMovement } from "$lib/GameSystem/System/GsWorldMovement";
	import { fromEvent } from "rxjs";
	import { onMount } from "svelte";

    onMount(() => {
        let enManager = new EnManager();
        let gsManager = new GsManager();
        let gsWorldMovement = new GsWorldMovement();

        gsWorldMovement.subscribeObservable(fromEvent(document, "click"))

        gsManager.registerGameSystem(gsWorldMovement);

        let entity = enManager.createEntity();
        let pos = new EcPositional(entity, {
            default: {
                position: { x: 0, y: 0 },
                canMove: true,
            }
        });

        gsManager.inyectGsToEc(pos);
    })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
