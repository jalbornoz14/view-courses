<template>
    <v-card class="mx-auto my-12 " max-width="374">
        <v-img height="250" :src="course.img"></v-img>

        <v-card-title>{{ course.name }}</v-card-title>

        <v-card-text>
            <v-row align="center" class="mx-0" v-if="noCalification">
                <v-rating :value="parseTowDecimal(course.promediun)" color="amber" dense half-increments readonly
                    size="14"></v-rating>

                <div class="grey--text ms-4">
                    {{ parseTowDecimal(course.promediun) }} ({{ course.califications }})
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                By: {{ course.autor }}
            </div>

            <div> {{ course.description }}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <v-card-actions class="justify-space-between">
            <v-btn color="deep-purple lighten-2" text :to="'/course/' + course.id">
                Ver curso
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'CardsCourses',
    props: {
        course: {
            type: Object,
            required: true
        },
        noCalification: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({

    }),

    methods: {
        parseTowDecimal(number) {
            return number.toFixed(2);
        },
    }
}
</script>

<style>

</style>
