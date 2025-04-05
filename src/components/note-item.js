import Swal from "sweetalert2";

class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card">
        <h2>${this._note.title}</h2>
        <p>${this._note.body}</p>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    this.querySelector(".delete-btn").addEventListener("click", () => this.confirmDelete());
  }

  async confirmDelete() {
    const result = await Swal.fire({
      title: "Apa Kamu Yakin Hapus Catatan Ini?",
      text: "Catatan Ini Akan Dihapus Secara Permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus Catatan Ini!",
    });

    if (result.isConfirmed) this.deleteNote();
  }

  async deleteNote() {
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${this._note.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Gagal menghapus catatan.");

      this.remove();
      Swal.fire({
        title: "Berhasil Dihapus!",
        text: "Catatan Anda Telah Dihapus",
        icon: "success",
        customClass: { confirmButton: "btn-success" },
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Oops...",
        text: "Gagal menghapus catatan!",
        icon: "error",
        customClass: { confirmButton: "btn-danger" },
      });
    }
  }

  async toggleArchive() {
    const endpoint = this._note.archived ? "unarchive" : "archive";

    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${this._note.id}/${endpoint}`, { method: "POST" });
      if (!response.ok) throw new Error("Gagal memperbarui status catatan.");

      const { data } = await response.json();
      this.dispatchEvent(new CustomEvent("note-updated", { detail: data }));
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Oops...",
        text: "Gagal memperbarui status catatan!",
        icon: "error",
        customClass: { confirmButton: "btn-danger" },
      });
    }
  }
}

customElements.define("note-item", NoteItem);
