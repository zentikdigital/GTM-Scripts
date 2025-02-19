<script>
document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector("form"); // Cambia esto si el formulario tiene un selector específico
    if (!form) return;

    let started = false;
    let abandoned = true;
    let lastInteractedField = "";

    // Detectar cuando el usuario empieza a escribir en el formulario
    form.addEventListener("input", function(event) {
        if (!started) {
            started = true;
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'form_start',
                'form_id': form.id || 'unknown_form'
            });
        }
        lastInteractedField = event.target.name || event.target.id || 'unknown_field';
    });

    // Detectar si el usuario abandona sin enviar
    window.addEventListener("beforeunload", function() {
        if (started && abandoned) {
            window.dataLayer.push({
                'event': 'form_abandon',
                'form_id': form.id || 'unknown_form',
                'last_field': lastInteractedField
            });
        }
    });

    // Evitar que se marque como abandono si el usuario envía el formulario
    form.addEventListener("submit", function() {
        abandoned = false;
        window.dataLayer.push({
            'event': 'form_submit',
            'form_id': form.id || 'unknown_form'
        });
    });
});
</script>
