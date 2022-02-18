<template>
  <div class="layout-ccr">
    <h2 class="u-margin-bottom-medium">Results</h2>
    <BaseDatatable :columns="columns" :rows="results">
      <template v-slot:default="slotProps">
        <td>
          {{ date(slotProps.row.dateTime) }}
        </td>
        <td>{{ slotProps.row.email }}</td>
        <td>{{ slotProps.row.title }}</td>
        <td>
          <router-link :to="`/ccr/results/${slotProps.row.id}`">
            <BaseIcon name="eye" />
          </router-link>
        </td>
      </template>
    </BaseDatatable>
  </div>
</template>

<script>
import { date } from "@/composables/utilities.js";

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
    const pagination = {
      lastPage: "",
      currentPage: "",
      total: "",
      lastPageUrl: "",
      nextPageUrl: "",
      prevPageUrl: "",
      from: "",
      to: "",
    };
    const configPagination = (data) => {
      pagination.lastPage = data.last_page;
      pagination.currentPage = data.current_page;
      pagination.total = data.total;
      pagination.lastPageUrl = data.last_page_url;
      pagination.nextPageUrl = data.next_page_url;
      pagination.prevPageUrl = data.prev_page_url;
      pagination.from = data.from;
      pagination.to = data.to;
    };
    return {
      columns: [
        {
          width: "25%",
          label: "Submission Date",
          name: "dateTime",
        },
        { width: "35%", label: "Email", name: "email" },
        { width: "35%", label: "Title", name: "title" },
        { width: "5%", label: "Actions", name: "actions", isSortable: false },
      ],
      perPage: ["10", "20", "30"],
      pagination,
      configPagination,
      date,
    };
  },
};
</script>

<style lang="scss" scoped>
.ccr-job-list {
  grid-column: 3 / -3;
}
// Main styles
.search {
  margin: 2em auto;
}
</style>
