<template>
  <div class="layout-ccr">
    <h2 class="u-margin-bottom-medium">Results</h2>
    <div class="results-container">
      <BaseDatatable :columns="columns" :rows="results">
        <template v-slot:default="slotProps">
          <tr>
            <td v-if="!isMobile">
              {{ date(slotProps.row.dateTime) }}
            </td>
            <td v-if="!isMobile">{{ slotProps.row.email }}</td>
            <td>{{ slotProps.row.title }}</td>
            <td>{{ slotProps.row.status }}</td>

            <td>
              <button
                class="button button--ghost button--large"
                @click="$router.push(`/ccr/results/${slotProps.row.id}`)"
              >
                Show
              </button>
            </td>
          </tr>
        </template>
      </BaseDatatable>
    </div>
  </div>
</template>

<script>
import { date } from "@/composables/utilities.js";
import { ref, watchEffect } from "vue";
import { resizeListener } from "@/composables/utilities.js";

export default {
  title: "Jobs Results",
  name: "ViewCRISPRcleanRResultsList",
  components: {},
  props: {
    results: {
      type: Array,
    },
  },
  setup() {
    const isMobile = ref(false);

    resizeListener(() => (isMobile.value = window.innerWidth < 770));

    const columns = ref(null);

    watchEffect(() => {
      if (!isMobile.value) {
        columns.value = [
          {
            width: "25%",
            label: "Submission Date",
            name: "dateTime",
            type: "date",
          },
          { width: "30%", label: "Email", name: "email", type: "string" },

          { width: "20%", label: "Title", name: "title", type: "string" },
          { width: "20%", label: "Status", name: "status", type: "string" },

          { width: "5%", label: "Actions", name: "actions", isSortable: false },
        ];
      } else {
        columns.value = [
          { width: "50%", label: "Title", name: "title" },
          { width: "20%", label: "Status", name: "status" },
          {
            width: "30%",
            label: "Actions",
            name: "actions",
            isSortable: false,
          },
        ];
      }
    });

    return {
      columns,
      date,
      isMobile,
    };
  },
};
</script>

<style lang="scss" scoped>
.results-container {
  max-width: 150rem;
}
</style>
