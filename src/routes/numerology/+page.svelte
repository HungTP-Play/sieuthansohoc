<script lang="ts">
	import { Numerology } from "../../core/numerology";

	
	function splitName(fullName: string) {
		// Your name splitting logic here
		// This function should return an array of strings
		return fullName.split(' ');
	}

	function splitBirthday(birthday: string) {
		// Your birthday splitting logic here
		// This function should return an array of strings
		return birthday.split('-');
	}

	function numerologyCalculate(fullName: string, birthday: string) {
		// Your numerology calculation logic here
		// This function should return a result or update some state with the result
        console.log(fullName, birthday);
		const nameArray = splitName(fullName);
		const firstNameVn = nameArray[nameArray.length - 1];
		const lastNameVn = nameArray[0];
		const middleNameVn = nameArray.slice(1, nameArray.length - 1).join(' ');
		const [day, month, year] = splitBirthday(birthday);
		console.log(nameArray, day, month, year);

		const numerology = new Numerology(parseInt(day), parseInt(month), parseInt(year), firstNameVn, lastNameVn, middleNameVn);
		const lifePathNumber = numerology.lifePathNumber();
		const destinyNumber = numerology.destinyNumber();
		const soulUrgeNumber = numerology.soulUrgeNumber();
		const characterNumber = numerology.characterNumber();
		
		console.log({
			lifePathNumber,
			destinyNumber,
			soulUrgeNumber,
			characterNumber
		})

	}



	let name = '';
	let birthday = '';

	function handleClick() {
		numerologyCalculate(name, birthday);
	}
</script>

<main>
	<h1>Numerology Calculator</h1>
	<label>
		Name:
		<input type="text" bind:value={name} />
	</label>
	<label>
		Birthday:
		<input type="date" bind:value={birthday} />
	</label>
	<button on:click={handleClick}>Calculate</button>
</main>
