import { Injectable } from '@angular/core';

@Injectable()
export class HorasEntregaService {

    private horas: string[];

    constructor() { }

    getHoras() {
        if (!this.horas) {
            this.generateHoras();
        }
        return this.horas;
    }

    private generateHoras() {
        const horas: string[] = [];
        for (let i = 5; i < 18; i++) {
            for (let h = 0; h < 4; h++) {
                const hora = `${(i % 12) === 0 ? 12 : (i % 12)}:${h * 15 === 0 ? '00' : h * 15} ${i <= 12 ? 'am' : 'pm'}`;
                horas.push(hora);
            }
        }
        this.horas = horas;
    }
}

export class HoraEntrega {
    public horas: string[];

}
