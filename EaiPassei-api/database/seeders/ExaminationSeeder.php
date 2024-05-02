<?php

namespace Database\Seeders;

use App\Models\EducationalLevel;
use Illuminate\Database\Seeder;
use App\Models\Examination;

class ExaminationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $educationalLevels = EducationalLevel::all()->pluck('id')->toArray();

        $examinationData = [
            'Professores da Prefeitura',
            'Polícia Federal',
            'Auditor Fiscal da Receita Federal',
            'Juiz Federal',
            'Desembargador Regional',
            'Promotor de Justiça',
            'Agente da Polícia Rodoviária Federal',
            'Escrivão da Polícia Civil',
            'Soldado da Polícia Militar',
            'Analista da ANVISA',
            'Agente da CVM',
            'Especialista em Regulação da ANATEL',
            'Professor Universitário',
            'Diplomata',
            'Procurador da República',
            'Técnico do INSS',
            'Agente de Trânsito',
            'Agente Penitenciário',
            'Professor da Rede Estadual de São Paulo',
            'Auditor Fiscal do Estado do Rio de Janeiro',
            'Defensor Público do Estado de Minas Gerais',
            'Caixa Econômica Federal',
            'Banco do Brasil',
            'BNDES',
            'Advogado da União',
            'Oficial de Justiça',
            'Contador do Tribunal de Contas da União',
            'Agente de Saúde Pública',
            'Assistente Social',
            'Bibliotecário',
            'Engenheiro da Petrobrás',
            'Técnico de Enfermagem',
            'Agente de Combate às Endemias',
            'Fiscal de Rendas',
            'Tradutor e Intérprete',
            'Perito Criminal',
            'Médico Legista',
            'Cientista de Dados',
            'Analista de Controle Externo do TCU',
            'Procurador do Estado',
            'Defensor Público da União',
            'Tribunal de Justiça do Distrito Federal e Territórios (TJDFT)',
            'Agente Florestal',
            'Agente de Imigração',
            'Meteorologista',
            'Geólogo',
        ];

        foreach ($examinationData as $title) {
            $educationalLevelId = $educationalLevels[array_rand($educationalLevels)];

            Examination::create([
                'title' => $title,
                'active' => true,  // Atribuindo valor fixo para active
                'institution' => 'Governo Federal',  // Adapte a instituição se necessário
                'educational_level_id' => $educationalLevelId,
            ]);
        }
    }
}
