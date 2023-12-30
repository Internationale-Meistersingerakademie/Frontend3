export default defineNuxtPlugin(() => {
    return {
        provide: {
            getElementByTitle: (title: string, data: Array<Record<string, any>>): {
                subtitle: string;
                title: string;
                content: string
            } => {
                const nuxtApp = useNuxtApp()
                const result = data.find((item) => item.titleIntern === title)
                if (result) return result[nuxtApp.$i18n.locale.value]
                // for (let i = 0; i < data.length; i++) {
                //     if (data[i].titleIntern === title) return data[i][nuxtApp.$i18n.locale.value];
                // }
                return {content: "", title: "", subtitle: ""};
            },
        }
    }
})