import Swal from "sweetalert2";

class AddNote extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  get form() {
    return this.querySelector("#add-note-form");
  }

  get title() {
    return this.querySelector("#title").value.trim();
  }

  get body() {
    return this.querySelector("#body").value.trim();
  }

  render() {
    this.innerHTML = `
      <form id="add-note-form">
        <input type="text" id="title" placeholder="Judul Catatan" required>
        <textarea id="body" placeholder="Isi Catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (!this.title || !this.body) {
      return Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Judul dan isi catatan tidak boleh kosong!",
        customClass: { confirmButton: "btn-warning" },
      });
    }

    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: this.title, body: this.body }),
      });

      if (!response.ok) throw new Error("Gagal menyimpan catatan.");

      const { data } = await response.json();

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Sukses Menambah Catatan!",
        customClass: { confirmButton: "btn-success" },
      });

      this.dispatchEvent(new CustomEvent("note-added", { detail: data }));
      this.form.reset();
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ada Yang Tidak Beres!",
        customClass: { confirmButton: "btn-danger" },
      });
    }
  }
}

customElements.define("add-note", AddNote);
