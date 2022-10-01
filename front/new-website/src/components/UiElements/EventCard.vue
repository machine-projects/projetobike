<template>
  <div class="bg-white drop-shadow-2xl  rounded-3xl p-4 m-4">
    <div class="flex-none sm:flex">
      <div class="flex-auto justify-evenly">
        <div class="flex items-center justify-between">
          <div class="flex items-center  my-1">
            <h2 class="font-medium">Nome do Evento</h2>
          </div>
        </div>
        <div class="border-dashed border-b-2 my-5"></div>
        <div class="flex flex-col items-center">
          <div class="flex flex-col mx-auto">
            <img src="http://localhost:3000/api/v1/event/file/33101779e1655428638123.jpg" class="w-full p-1">
          </div>
          <div class="ml-auto text-blue-800">Featured</div>
        </div>
        <div class="border-dashed border-b-2 pt-5"></div>

        <div class="flex flex-col items-center mb-5 p-5 text-sm">
          <div class="flex flex-col w-full items-center">
            <span class="text-sm font-bold">Datas</span>
            <div class="flex w-full">
              <span class="flex grow items-center flex-col">
                <p class="font-semibold">Inicio</p>
                <p> 03-05 </p>
              </span>
              <span class="flex grow items-center flex-col">
                <p class="font-semibold">Fim</p>
                <p> 04-05 </p>
              </span>
            </div>
            <span class="font-bold mt-5">Local</span>
            <p>Cidade xis com o estado y</p>
            <span class="font-bold mt-5">Descriçao</span>
            <p>Exento muito legal</p>
          </div>
        </div>

        <div class="border-dashed border-b-2 pt-2 mb-4"></div>

        <button
          class="rounded-full border border-indigo-500 bg-indigo-500 text-white px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline w-full">
          Inscrever-se</button>
      </div>
    </div>
  </div>
</template>

<style>

</style>