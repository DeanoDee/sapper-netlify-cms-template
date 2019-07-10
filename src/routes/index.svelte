<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`things.json`).then(r => r.json()).then(things => {
			return { things };
		});
	}
</script>

<script>
	export let things;
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper & Netlify CMS project template</title>
</svelte:head>

<h1>We Have Things!</h1>

<figure>
	<img alt='Thing One and Thing Two' src='thingOneThingTwo.png'>
</figure>

<ul>
	{#each things as thing}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='things/{thing.slug}'>{thing.title}</a></li>
	{/each}
</ul>

<p><strong>Take a look at <a href="about">about</a> to see what you might want to edit.</strong></p>
