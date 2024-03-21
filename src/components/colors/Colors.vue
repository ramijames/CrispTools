<script setup>

const colors = {
	primary: { label: 'Primary Color', style: 'backgroundColor: selectedColor', hex: 'rgbToHex(selectedColor)', rgb: 'hexToRgb(selectedColor)'},
}

</script>

<template>
	<div>
		<div v-for="(color, key) in colors" :key="key" class="flex flex-row gap-2 items-center">
			<div class="text-xs w-40">{{ color.label }}</div>
			<div class="w-6 h-10 rounded" style="{ color.style }"></div>
			<p class="text-xs text-center text-slate-700" v-if="showHex">{{ rgbToHex(selectedColor) }}</p>
			<p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(selectedColor) }}</p>
		</div>
	</div>
</template>
