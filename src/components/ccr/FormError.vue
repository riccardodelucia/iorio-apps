<template>
  <!--   <div class="card card--padding" :style="'width:100%'">
 -->

  <div>
    <BaseError
      :title="'Something went wrong... 💥'"
      :msg="'The job has not been submitted. Please try again'"
    />
    <div class="u-margin-top-medium u-center-content">
      <BaseButton type="button" @click="$emit('nav', { event: 'NEWJOB' })"
        >Submit Another Job</BaseButton
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "FormError",
};
</script>

<style></style>
