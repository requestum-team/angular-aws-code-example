import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DoughnutColors, LineColors } from '@app/models/enums/diagrams.enum';
import { IDoughnutStatistics, ILineStatistics } from '@app/models/interfaces/statistics-data.interface';
import { ToolbarHelperService } from '@app/services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartType, Chart, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements AfterViewInit, OnInit {
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;
  @ViewChild('partsBaseChart') partsBaseChart: BaseChartDirective;
  Math: any = Math;
  partsChartLegendItems: any;
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tt: false
    },
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    }
  };
  pieChartOptions: any = {
    responsive: true,
    cutout: 130
  };
  doughnutChartType: ChartType = 'doughnut';
  lineChartType: ChartType = 'line';
  documentsYours: ILineStatistics[];
  documentsSecured: ILineStatistics[];
  networkSecured: ILineStatistics[];
  structureStatistics: IDoughnutStatistics[];
  doughnutChartNumbers: number[];
  documentsYoursChartData: ChartConfiguration['data'];
  documentsNewChartData: ChartConfiguration['data'];
  networkSecuredChartData: ChartConfiguration['data'];
  doughnutChartData: ChartData;

  constructor(private _toolbarHelper: ToolbarHelperService, protected translate: TranslateService, private _cdr: ChangeDetectorRef) {
    this.registerCornersPlugin();
  }

  ngOnInit() {
    this.documentsYours = [
      { year: 2018, data: 2000, changes: 0.01 },
      { year: 2019, data: 2034, changes: 0.02 },
      { year: 2020, data: 1034, changes: -0.49 },
      { year: 2021, data: 1024, changes: -0.01 }
    ];
    this.documentsSecured = [
      { year: 2018, data: 2000, changes: 0.01 },
      { year: 2019, data: 2034, changes: 0.02 },
      { year: 2020, data: 1034, changes: -0.49 },
      { year: 2021, data: 2024, changes: 0.9 }
    ];
    this.networkSecured = [
      { year: 2018, data: 2000, changes: 0.01 },
      { year: 2019, data: 2024, changes: 0.02 },
      { year: 2020, data: 1034, changes: -0.49 },
      { year: 2021, data: 1034, changes: 0 }
    ];
    this.structureStatistics = [
      { label: 'Student Record', data: 40, type: 'student' },
      { label: 'Review', data: 25, type: 'review' },
      { label: 'Financial', data: 10, type: 'financial' },
      { label: 'Correspondence', data: 15, type: 'correspondence' },
      { label: 'Governance', data: 10, type: 'governance' }
    ];
    this.doughnutChartNumbers = this.structureStatistics.map((item: any) => item.data);
    this.documentsYoursChartData = this.getLineData(this.documentsYours);
    this.documentsNewChartData = this.getLineData(this.documentsSecured);
    this.networkSecuredChartData = this.getLineData(this.networkSecured);
    this.doughnutChartData = {
      labels: this.structureStatistics.map((item: any) => item.label),
      datasets: [
        {
          data: this.doughnutChartNumbers,
          backgroundColor: this.structureStatistics.map((item: any) => DoughnutColors[item.type]),
          hoverBackgroundColor: this.structureStatistics.map((item: any) => DoughnutColors[item.type]),
          borderWidth: 0
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this.translate.instant(`PAGE_NAME.ANALYTICS`),
      hint: this.translate.instant(`HINT.ANALYTICS`)
    };

    this.partsChartLegendItems = this.partsBaseChart.chart['legend']['legendItems'];
    this._cdr.detectChanges();
  }

  getLineColor(data: Array<any>) {
    let color;

    if (data[data.length - 1].changes > 0) {
      color = LineColors.increase;
    } else if (data[data.length - 1].changes < 0) {
      color = LineColors.decrease;
    } else {
      color = LineColors.same;
    }

    return color;
  }

  getLastValue(data: Array<any>) {
    return data[data.length - 1];
  }

  getLineData(data: Array<any>) {
    return {
      labels: data.map((item: any) => item.year),
      datasets: [
        {
          data: data.map((item: any) => item.data),
          backgroundColor: this.getLineColor(data),
          borderColor: this.getLineColor(data),
          fill: false,
          pointRadius: 0,
          borderWidth: 1
        }
      ]
    };
  }

  registerCornersPlugin() {
    Chart.register({
      id: 'roundedCorners',
      afterDatasetsDraw: (chart: Chart) => {
        if (chart.config.type === this.doughnutChartType) {
          const ctx = chart.ctx;
          const arcs = chart.getDatasetMeta(0).data;

          arcs.forEach((arc: any, i: number) => {
            const pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
            const pColor = pArc.options.backgroundColor;
            const vm = arc;
            const radius = (vm.outerRadius + vm.innerRadius) / 2;
            const thickness = (vm.outerRadius - vm.innerRadius) / 2;
            const startAngle = Math.PI - vm.startAngle - Math.PI / 2;
            const angle = Math.PI - vm.endAngle - Math.PI / 2;

            ctx.save();
            ctx.translate(vm.x, vm.y);

            if (i !== 0) {
              ctx.fillStyle = i === 0 ? vm.options.backgroundColor : pColor;
              ctx.beginPath();
              ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
              ctx.fill();
            }

            ctx.fillStyle = vm.options.backgroundColor;
            ctx.beginPath();
            ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
          });
        }
      }
    });
  }
}
