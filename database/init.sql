CREATE DATABASE bener;

\c bener;

CREATE TABLE Aparatur (
    aparatur_id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    telepon VARCHAR(255) NOT NULL,
    foto BYTEA NOT NULL,
    kata_sandi VARCHAR(255) NOT NULL
);

CREATE TABLE Umum (
    umum_id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    nik VARCHAR(255) NOT NULL,
    kata_sandi VARCHAR(255) NOT NULL
);

CREATE TABLE Pelayanan (
    pelayanan_id SERIAL PRIMARY KEY,
    nama VARCHAR(255)
);

CREATE TABLE Pengajuan (
    pengajuan_id SERIAL PRIMARY KEY,
    jenis_pelayanan INT NOT NULL,
    status VARCHAR(20) CHECK (status in ('dalam antrian', 'disetujui', 'ditolak')),
    alasan_penolakan TEXT NOT NULL,
    ditolak_oleh INT,
    waktu_upload INT NOT NULL,

    CONSTRAINT jenis_pelayanan_ajuan 
        FOREIGN KEY (jenis_pelayanan) 
        REFERENCES Pelayanan(pelayanan_id) 
        ON DELETE CASCADE,

    CONSTRAINT aparatur_penolak 
        FOREIGN KEY (ditolak_oleh)
        REFERENCES Aparatur(aparatur_id) 
        ON DELETE SET NULL
);

CREATE TABLE Lampiran_Pengajuan (
    lampiran_pengajuan_id SERIAL PRIMARY KEY,
    pengajuan_id INT,
    nama_file VARCHAR(255) NOT NULL,
    besar_file INT NOT NULL,
    isi_file BYTEA NOT NULL,
    deskripsi VARCHAR(255) NOT NULL,

    CONSTRAINT lampiran_suatu_ajuan 
        FOREIGN KEY (pengajuan_id) 
        REFERENCES Pengajuan(pengajuan_id) 
        ON DELETE CASCADE
);

CREATE TABLE Komentar (
    komentar_id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    surel VARCHAR(255) NOT NULL,
    isi TEXT NOT NULL,
    waktu_upload INT NOT NULL
);

CREATE TABLE Label (
    label_id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL
);

CREATE TABLE Artikel (
    artikel_id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    isi TEXT,
    waktu_upload INT NOT NULL
);

CREATE TABLE Label_Artikel (
    artikel_id INT,
    label_id INT,

    CONSTRAINT artikel_dari_label 
        FOREIGN KEY (artikel_id) 
        REFERENCES Artikel(artikel_id) 
        ON DELETE CASCADE,

    CONSTRAINT label_dari_artikel 
        FOREIGN KEY (label_id) 
        REFERENCES Label(label_id) 
        ON DELETE CASCADE
);

CREATE TABLE Lampiran_Artikel (
    lampiran_artikel_id SERIAL PRIMARY KEY,
    artikel_id INT,
    nama_file VARCHAR(255) NOT NULL,
    besar_file INT NOT NULL,
    isi_file BYTEA NOT NULL,

    CONSTRAINT artikel_dari_lampiran 
        FOREIGN KEY (artikel_id) 
        REFERENCES Artikel(artikel_id) 
        ON DELETE CASCADE
);

CREATE TABLE Dusun (
    dusun_id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    rt INT NOT NULL,
    populasi INT NOT NULL,
    keluarga INT NOT NULL,
    laki INT NOT NULL,
    perempuan INT NOT NULL,
    umkm INT NOT NULL,
    islam INT NOT NULL,
    protestanisme INT NOT NULL,
    katolisisme INT NOT NULL,
    hinduisme INT NOT NULL,
    buddhisme INT NOT NULL,
    konfusianisme INT NOT NULL,
    tunadaksa INT NOT NULL,
    tunanetra INT NOT NULL,
    tunarungu INT NOT NULL,
    tunawicara INT NOT NULL,
    tunagrahita INT NOT NULL,
    tunalaras INT NOT NULL,
    kps INT NOT NULL,
    ks_satu INT NOT NULL,
    ks_dua INT NOT NULL,
    ks_tuga INT NOT NULL,
    ks_tiga_plus INT NOT NULL
);

CREATE TABLE Profil (
    profil_id SERIAL PRIMARY KEY,
    deskripsi_sekilas VARCHAR(255) NOT NULL,
    kode_desa INT NOT NULL,
    kecamatan VARCHAR(255) NOT NULL,
    kabupaten_kota VARCHAR(255) NOT NULL,
    provinsi VARCHAR(255) NOT NULL,
    tahun_pembentukan INT NOT NULL,
    luas DECIMAL NOT NULL,
    koordinat VARCHAR(255) NOT NULL,
    tipologi VARCHAR(255) NOT NULL,
    klasifikasi VARCHAR(255) NOT NULL,
    kategori VARCHAR(255) NOT NULL,
    batas_timur VARCHAR(255) NOT NULL,
    batas_barat VARCHAR(255) NOT NULL,
    batas_selatan VARCHAR(255) NOT NULL,
    batas_utara VARCHAR(255) NOT NULL,
    sejarah TEXT NOT NULL,
    peta BYTEA NOT NULL,
    tautan_kalender VARCHAR(255)
);

CREATE TABLE Visi (
    visi_id SERIAL PRIMARY KEY,
    isi TEXT
);

CREATE TABLE Misi (
    misi_id SERIAL PRIMARY KEY,
    isi TEXT
);

CREATE TABLE Apbdes (
    apbdes_id SERIAL PRIMARY KEY,
    tahun INT
);

CREATE TABLE Lampiran_Apbdes (
    apbdes_file_id SERIAL PRIMARY KEY,
    apbdes_id INT,
    nama_file VARCHAR(255),
    besar_file INT NOT NULL,
    isi_file BYTEA NOT NULL,

    CONSTRAINT lampiran_dari_apbdes 
        FOREIGN KEY (apbdes_id) 
        REFERENCES Apbdes(apbdes_id) 
        ON DELETE CASCADE
);

CREATE TABLE Wisata (
    wisata_id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    foto BYTEA NOT NULL
);

CREATE TABLE Umkm (
    umkm_id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    dusun_id INT,
    deskripsi TEXT NOT NULL,
    foto BYTEA NOT NULL

    CONSTRAINT dusun_dari_umkm 
        FOREIGN KEY (dusun_id) 
        REFERENCES Dusun(dusun_id) 
        ON DELETE CASCADE
);

CREATE TABLE Kontak_Umkm (
    kontak_umkm_id SERIAL PRIMARY KEY,
    umkm_id INT,
    jenis_kontak VARCHAR(255),
    isi VARCHAR(255),
    tautan VARCHAR(255)

    CONSTRAINT umkm_dari_kontak 
        FOREIGN KEY (umkm_id) 
        REFERENCES Umkm(umkm_id) 
        ON DELETE CASCADE
);