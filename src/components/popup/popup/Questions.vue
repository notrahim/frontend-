<template>
    <v-card>
        <v-container>
        <v-row align='center' v-if="company=='SARL'">
            <v-col>
                <v-row align='center'>
            <h3>L'entreprise est elle ESS?</h3>
            <v-checkbox color="accent" v-model="Ess"></v-checkbox>
        </v-row>
        </v-col>
        </v-row>
        <v-row  align='center'>
        <v-col>
            <v-row align='center'>
            <h3>L'entreprise résulte t elle d'une fusion?</h3>
            <v-checkbox color="accent" v-model="Fusion"></v-checkbox>
        </v-row>
            </v-col>
        </v-row>
    </v-container>
    </v-card>
</template>

<script>
    export default {    
        props: ['company'],
        data() {
            return {
                Ess : false,
                Fusion : false
            };
        },
        computed: {
            postData() {
                const data = {
                    ESS : this.Ess,
                    Fusion : this.Fusion
                };
            return data;
        },
    },
};
</script>