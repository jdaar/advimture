<script lang="ts">
	import { EcGraphic } from "$lib/GameSystem/Component/EcGraphic";
    import { EcPositional } from "$lib/GameSystem/Component/EcPositional";
	import { EnManager } from "$lib/GameSystem/EnManager";
	import { GsManager } from "$lib/GameSystem/GsManager";
	import { GsCanvas } from "$lib/GameSystem/System/GsCanvas";
	import { GsWorldMovement } from "$lib/GameSystem/System/GsWorldMovement";
	import { fromEvent, interval } from "rxjs";
	import { onMount } from "svelte";

    onMount(() => {
        let enManager = new EnManager();
        let gsManager = new GsManager();

        let gsWorldMovement = new GsWorldMovement();
        gsWorldMovement.subscribeObservable(fromEvent(document, "click"));
        let gsCanvas = new GsCanvas();
        gsCanvas.subscribeObservable(interval(1000));

        gsManager.registerGameSystem(gsWorldMovement);
        gsManager.registerGameSystem(gsCanvas);

        let entity = enManager.createEntity();
        let pos = new EcPositional(entity, {
            default: {
                position: { x: 0, y: 0 },
                canMove: true,
            }
        });
        let graph = new EcGraphic(entity, {
            default: {
                backgroundColor: "red",
                borderColor: "black",
                resource: "https://www.w3schools.com/w3css/img_lights.jpg",
            }
        })

        gsManager.inyectGsToEc(graph);
        gsManager.inyectGsToEc(pos);
    })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
