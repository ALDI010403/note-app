class NoteList extends HTMLElement {
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", () => this.render());
  }

  async fetchNotes() {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const data = await response.json();
    return data.data;
  }

  async render() {
    const loadingIndicator = this.querySelector("loading-indicator");

    loadingIndicator?.show();

    try {
      const notes = await this.fetchNotes();
      this.innerHTML = "";
      notes.forEach(note => {
        const noteItem = document.createElement("note-item");
        noteItem.note = note;
        this.appendChild(noteItem);
      });
    } catch (error) {
      console.error("Error fetching notes:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Mengambil Catatan",
        text: "Terjadi kesalahan saat mengambil data.",
        customClass: { confirmButton: "btn-danger" }
      });
    } finally {
      loadingIndicator?.hide();
    }
  }
}

customElements.define("note-list", NoteList);
